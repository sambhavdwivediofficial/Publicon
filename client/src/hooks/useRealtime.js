import { useContext } from 'react';
import { RealtimeContext } from '../context/RealtimeContext';

export const useRealtime = () => useContext(RealtimeContext);