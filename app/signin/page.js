import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Bantrab — Log in',
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
