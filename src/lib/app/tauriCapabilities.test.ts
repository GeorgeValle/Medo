import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function readJson(path: string) {
  return JSON.parse(readFileSync(resolve(process.cwd(), path), 'utf-8')) as Record<string, unknown>;
}

describe('tauri close capabilities', () => {
  it('incluye permiso core:window:allow-close y aplica a label main', () => {
    const capability = readJson('src-tauri/capabilities/default.json');
    const permissions = capability.permissions as string[];
    const windows = capability.windows as string[];

    expect(permissions).toContain('core:window:allow-close');
    expect(windows).toContain('main');
  });

  it('la ventana principal en tauri.conf.json usa label main', () => {
    const tauriConfig = readJson('src-tauri/tauri.conf.json');
    const app = tauriConfig.app as { windows?: Array<{ label?: string }> };
    const labels = (app.windows ?? []).map((window) => window.label);

    expect(labels).toContain('main');
  });
});
