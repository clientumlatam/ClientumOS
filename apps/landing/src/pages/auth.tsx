import { LoginPage } from './LoginPage';

interface AuthPageProps {
  onAuthenticated?: (username: string, role?: string) => void;
  currentUser?: string | null;
}

export function AuthPage({ onAuthenticated, currentUser }: AuthPageProps) {
  return (
    <LoginPage
      currentUser={currentUser}
      onLoginSuccess={(user) => {
        if (onAuthenticated) {
          onAuthenticated(user.username, user.role);
        }
      }}
    />
  );
}

export default AuthPage;

