import { getAdminAuth } from './admin';

export async function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  const token = authHeader.replace('Bearer ', '');
  const auth = await getAdminAuth();
  return await auth.verifyIdToken(token);
}