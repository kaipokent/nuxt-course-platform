import {
  serverSupabaseUser,
  serverSupabaseSession,
} from '#supabase/server';

export default defineEventHandler(async (event) => {
  // We need to verify a session exists before we can get the user
  const session = await serverSupabaseSession(event);
  if (session) {
    event.context.user = await serverSupabaseUser(event);
  }
});
