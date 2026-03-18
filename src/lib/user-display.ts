import { prisma } from "@/lib/prisma";

type UserDisplayEntry = {
  name: string | null;
  role: string | null;
};

export function getUserLookupKeys(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return [];

  const keys = new Set<string>([trimmed.toLowerCase()]);
  if (trimmed.includes("@")) {
    keys.add(trimmed.split("@")[0].toLowerCase());
  }

  return Array.from(keys);
}

function prettifyLocalPart(value: string) {
  const base = value.includes("@") ? value.split("@")[0] : value;
  return base
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function buildUserDisplayLookup(values: string[]) {
  const normalizedValues = Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
  if (normalizedValues.length === 0) {
    return new Map<string, UserDisplayEntry>();
  }

  const emailValues = normalizedValues.filter((value) => value.includes("@"));

  const users = await prisma.user.findMany({
    where: {
      OR: [
        ...(emailValues.length > 0 ? [{ email: { in: emailValues } }] : []),
        { name: { in: normalizedValues } },
      ],
    },
    select: {
      email: true,
      name: true,
      role: true,
    },
  });

  const lookup = new Map<string, UserDisplayEntry>();

  for (const user of users) {
    const entry: UserDisplayEntry = {
      name: user.name?.trim() || prettifyLocalPart(user.email),
      role: user.role || null,
    };

    for (const source of [user.email, user.name].filter(Boolean) as string[]) {
      for (const key of getUserLookupKeys(source)) {
        lookup.set(key, entry);
      }
    }
  }

  return lookup;
}

export function getDisplayNameForUserValue(value: string | null | undefined, lookup?: Map<string, UserDisplayEntry>) {
  const trimmed = value?.trim();
  if (!trimmed) return "Unknown";

  for (const key of getUserLookupKeys(trimmed)) {
    const matched = lookup?.get(key);
    if (matched?.name?.trim()) {
      return matched.name.trim();
    }
  }

  return trimmed.includes("@") ? prettifyLocalPart(trimmed) : trimmed;
}

export function getRoleForUserValue(
  value: string | null | undefined,
  lookup?: Map<string, UserDisplayEntry>,
) {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  for (const key of getUserLookupKeys(trimmed)) {
    const matched = lookup?.get(key);
    if (matched?.role?.trim()) {
      return matched.role.trim();
    }
  }

  return null;
}
