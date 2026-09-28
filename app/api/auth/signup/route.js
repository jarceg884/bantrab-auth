import { findUserByEmail, createUser } from '@/lib/users';
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

  const { name, email, password } = body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return Response.json({ error: 'Name must be at least 2 characters long.' }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return Response.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
  }

  const existing = findUserByEmail(email);
  if (existing) {
    return Response.json({ error: 'An account with this email already exists.' }, { status: 409 });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = createUser({ name: name.trim(), email, passwordHash });
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
