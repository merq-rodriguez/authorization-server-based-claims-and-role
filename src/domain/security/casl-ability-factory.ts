import { Action } from "./enums/action.enum";
import { Book } from "../book/book.entity";
import { User } from "../users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";

type Subjects = typeof Book | typeof User | Book | User | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Book, { authorId: user.id });
    cannot(Action.Delete, Book, { isPublished: true });

    return build();
  }
}