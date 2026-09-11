self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const path = event.notification.data?.path || "/crew/activity";
  const destination = new URL(`#${path}`, self.registration.scope).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const existing = windows[0];
    if (existing) {
      await existing.navigate(destination);
      return existing.focus();
    }
    return self.clients.openWindow(destination);
  })());
});
