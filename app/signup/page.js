import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Bantrab — Create your account',
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
