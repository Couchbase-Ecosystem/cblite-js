import { Dictionary } from "./definitions";
import { ReplicatorConfiguration } from "./replicator-configuration";
import { Authenticator } from './authenticator';

export class BasicAuthenticator extends Authenticator {
  constructor(private username: string, private password: string) {
    super();
  }

  authenticate(options: Dictionary) {
    const auth = {
      [ReplicatorConfiguration.kC4ReplicatorAuthType]: ReplicatorConfiguration.kC4AuthTypeBasic,
      [ReplicatorConfiguration.kCBLReplicatorAuthUserName]: this.username,
      [ReplicatorConfiguration.kCBLReplicatorAuthPassword]: this.password,
    };
    options[ReplicatorConfiguration.kCBLReplicatorAuthOption] = auth;
    return auth;
  }

  getType() {
    return 'basic';
  }

  toJson() {
    return {
      username: this.username,
      password: this.password
    }
  }
}