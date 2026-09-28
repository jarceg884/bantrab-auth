import { verifySessionToken } from '@/lib/session';

export async function GET(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifySessionToken(match[1]);
  if (!payload) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  return Response.json({
    user: { id: payload.sub, name: payload.name, email: payload.email },
  });
}
