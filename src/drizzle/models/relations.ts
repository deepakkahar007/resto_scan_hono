import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  RestaurentTable: {
    address: r.many.AddressTable(),
    category: r.many.CategoriesTable(),
    items: r.many.ItemTable(),
  },
  AddressTable: {
    restaurent: r.one.RestaurentTable({
      from: r.AddressTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    categories: r.many.CategoriesTable(),
  },
  CategoriesTable: {
    resturent: r.one.RestaurentTable({
      from: r.CategoriesTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    address: r.one.AddressTable({
      from: r.CategoriesTable.address_id,
      to: r.AddressTable.id,
    }),
  },
  ItemTable: {
    resturent: r.one.RestaurentTable({
      from: r.ItemTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    categories: r.one.CategoriesTable({
      from: r.ItemTable.categories_id,
      to: r.CategoriesTable.id,
    }),
  },
  SubCategoryTable: {
    resturent: r.one.RestaurentTable({
      from: r.SubCategoryTable.restaurent_id,
      to: r.RestaurentTable.id,
    }),
    categories: r.one.CategoriesTable({
      from: r.SubCategoryTable.categories_id,
      to: r.CategoriesTable.id,
    }),
  },
  QuantityTable: {
    item: r.one.ItemTable({
      from: r.QuantityTable.item_id,
      to: r.ItemTable.id,
    }),
  },
  AddOnTable: {
    item: r.one.ItemTable({
      from: r.AddOnTable.item_id,
      to: r.ItemTable.id,
    }),
  },

  // BETTER AUTH RELATIONS
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    members: r.many.member(),
    invitations: r.many.invitation(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  organization: {
    members: r.many.member(),
    invitations: r.many.invitation(),
  },
  member: {
    organization: r.one.organization({
      from: r.member.organizationId,
      to: r.organization.id,
    }),
    user: r.one.user({
      from: r.member.userId,
      to: r.user.id,
    }),
  },
  invitation: {
    organization: r.one.organization({
      from: r.invitation.organizationId,
      to: r.organization.id,
    }),
    invitedBy: r.one.user({
      from: r.invitation.inviterId,
      to: r.user.id,
    }),
  },
}));

// export const userRelations = relations(user, ({ many }) => ({
//   sessions: many(session),
//   accounts: many(account),
//   members: many(member),
//   invitations: many(invitation),
// }));

// export const sessionRelations = relations(session, ({ one }) => ({
//   user: one(user, {
//     fields: [session.userId],
//     references: [user.id],
//   }),
// }));

// export const accountRelations = relations(account, ({ one }) => ({
//   user: one(user, {
//     fields: [account.userId],
//     references: [user.id],
//   }),
// }));

// export const organizationRelations = relations(organization, ({ many }) => ({
//   members: many(member),
//   invitations: many(invitation),
// }));

// export const memberRelations = relations(member, ({ one }) => ({
//   organization: one(organization, {
//     fields: [member.organizationId],
//     references: [organization.id],
//   }),
//   user: one(user, {
//     fields: [member.userId],
//     references: [user.id],
//   }),
// }));

// export const invitationRelations = relations(invitation, ({ one }) => ({
//   organization: one(organization, {
//     fields: [invitation.organizationId],
//     references: [organization.id],
//   }),
//   user: one(user, {
//     fields: [invitation.inviterId],
//     references: [user.id],
//   }),
// }));
