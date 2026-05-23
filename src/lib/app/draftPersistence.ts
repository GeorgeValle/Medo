export const draftWriteDelayMs = 400;

export type DraftSnapshot = { content: string; displayName: string };

type StorageLike = Pick<Storage, 'setItem'>;

export function flushDraftToStorage(storage: StorageLike, key: string, draft: DraftSnapshot | null) {
  if (!draft) return;
  storage.setItem(key, JSON.stringify(draft));
}
