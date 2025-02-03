import DatastoreProvider from './DatastoreProvider';

export default function DatastoreProviderWrapper({ children }) {
  return <DatastoreProvider>{children}</DatastoreProvider>;
}
