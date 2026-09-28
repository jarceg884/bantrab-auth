import { findUserByEmail } from '@/lib/users';
import { createSessionToken } from '@/lib/session';
import bcrypt from 'bcryptjs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email, password } = body || {};

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!password || typeof password !== 'string') {
    return Response.json({ error: 'Please enter your password.' }, { status: 400 });
  }

  const user = findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return Response.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const token = await createSessionToken(user);
  const response = Response.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
  response.headers.append(
    'Set-Cookie',
    `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
  );
  return response;
}
