export default function getEnv(name) {
  return import.meta.env[name] || window?.configs?.[name] || "";
}
