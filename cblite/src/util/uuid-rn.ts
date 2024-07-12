// uuid-rn.ts
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

export function uuid() {
  return uuidv4();
}
