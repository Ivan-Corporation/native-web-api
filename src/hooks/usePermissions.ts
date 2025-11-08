import { useEffect, useState } from "react";

export function usePermissions(name: PermissionName) {
  const [state, setState] = useState<PermissionState | null>(null);

  useEffect(() => {
    if (!navigator.permissions) {
      setState("unsupported" as any);
      return;
    }

    let mounted = true;
    navigator.permissions.query({ name } as any).then((status) => {
      if (!mounted) return;
      setState(status.state);
      status.onchange = () => setState(status.state);
    });

    return () => {
      mounted = false;
    };
  }, [name]);

  return { state };
}
