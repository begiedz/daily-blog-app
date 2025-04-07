import { useEffect, useState } from 'react';
import { getUserProfile } from '../api/usersApi';
import Alert from '../components/Alert';
import FadeLoader from 'react-spinners/FadeLoader';

const ProfilePanel = () => {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const userProfile = await getUserProfile();
        setProfile(userProfile);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch profile',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (profile.password !== repeatPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    // Logic to update profile
  };

  if (loading) return <FadeLoader className="mx-auto" />;
  if (error) return <Alert variant="ERROR">{error}</Alert>;

  return (
    <main>
      <h2 className="mb-4 text-center text-3xl font-bold">Your Profile</h2>
      <form
        onSubmit={handleUpdateProfile}
        className="fieldset bg-base-200 border-base-300 rounded-box w-md max-w-full border p-10"
      >
        <div>
          <label className="fieldset-label">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            disabled
            minLength={3}
            maxLength={25}
            className="input validator w-full"
          />
          <p className="validator-hint hidden">
            Must be between 3 to 25 characters.
          </p>
        </div>

        <div>
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            placeholder="New email"
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            required
            className="input validator w-full"
          />
        </div>

        <div>
          <label className="fieldset-label">Password</label>
          <input
            type="password"
            placeholder="New password"
            value={profile.password}
            onChange={e => setProfile({ ...profile, password: e.target.value })}
            required
            minLength={6}
            className="input validator w-full"
          />
          <p className="validator-hint hidden">
            Must be at least 6 characters.
          </p>
        </div>

        <div>
          <label className="fieldset-label">Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat new password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            required
            minLength={6}
            className="input validator w-full"
          />
          <p className="validator-hint hidden">
            Must be at least 6 characters.
          </p>
        </div>
        {passwordError && <p className="text-red-400">{passwordError}</p>}
        <input
          type="submit"
          value="Update Profile"
          className="btn btn-primary mt-4"
        />
      </form>
    </main>
  );
};

export default ProfilePanel;
