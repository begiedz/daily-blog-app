using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using daily_blog_app.Interfaces;
using Microsoft.AspNetCore.Http;

namespace daily_blog_app.Services
{
    public class BlobService : IBlobService
    {
        private readonly IConfiguration _configuration;
        private readonly string _containerName = "images"; // Twój kontener

        public BlobService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var blobServiceClient = new BlobServiceClient(_configuration["AzureBlobStorage:ConnectionString"]);
            var containerClient = blobServiceClient.GetBlobContainerClient(_containerName);

            await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            var blobClient = containerClient.GetBlobClient(GenerateUniqueFileName(file.FileName));

            var httpHeaders = new BlobHttpHeaders
            {
                ContentType = file.ContentType // ustawia prawidłowy typ MIME np. image/jpeg
            };

            using (var stream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, httpHeaders);
            }

            return blobClient.Uri.ToString();
        }


        public async Task DeleteFileAsync(string fileName)
        {
            var blobServiceClient = new BlobServiceClient(_configuration["AzureBlobStorage:ConnectionString"]
);
            var containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = containerClient.GetBlobClient(fileName);

            await blobClient.DeleteIfExistsAsync();
        }

        // Tworzy unikalną nazwę pliku z zachowaniem rozszerzenia
        private string GenerateUniqueFileName(string originalName)
        {
            var ext = Path.GetExtension(originalName);
            return $"{Guid.NewGuid()}{ext}";
        }
    }
}
