import { useEffect } from 'react';
import { useLogoutMutation } from '@framework/auth/use-logout';

export default function LogoutPage() {
  const { mutateAsync: logout } = useLogoutMutation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    handleLogout();
  }, [logout]);

  return null;
}
