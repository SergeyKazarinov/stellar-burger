import { useLocation } from 'react-router-dom';

export type Location = ReturnType<typeof useLocation>
export type TLocationState = {
  [key: string]: string | null | TLocationState | TLocation,
};

export type TLocation = {
  state: {
    from: Location;
  }
}