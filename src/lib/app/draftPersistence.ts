export const draftWriteDelayMs = 400;

export type LocalDraftSnapshot = {
  content: string;
  displayName: string;
};

export function flushDraftToStorage(
  storage: Pick<Storage, 'setItem'>,
  key: string,
  draft: LocalDraftSnapshot | null
): void {
  if (!draft) return;
  storage.setItem(key, JSON.stringify(draft));
}
