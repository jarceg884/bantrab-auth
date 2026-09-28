import { verifySessionToken } from '@/lib/session';

export async function POST(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return Response.json({ user: null }, { status: 401 });

  const payload = await verifySessionToken(match[1]);
  if (!payload) return Response.json({ user: null }, { status: 401 });

  const response = Response.json({
    user: { id: payload.sub, name: payload.name, email: payload.email },
  });
  response.headers.append('Set-Cookie', 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return response;
}
