import type { OperationDef } from "./types.js";
import {
  deleteMessage,
  editMessage,
  forwardMessage,
  getChat,
  getMessage,
  listChats,
  listMessages,
  listParticipants,
  manageParticipants,
  markChatRead,
  markMessageRead,
  sendMessage,
  startChat,
} from "./messaging.js";
import { followUser, getCompany, getProfile, listConnections, listInvitations, respondInvitation, sendInvitation } from "./network.js";
import { addComment, createPost, getPost, listComments, listPosts } from "./posts.js";
import {
  linkedinReact,
  linkedinReactToMessage,
  listFollowers,
  listReactions,
  listUserComments,
  listUserReactions,
} from "./engagement.js";
import { getSearchParameters, searchLinkedIn } from "./search.js";
import { whoami } from "./account.js";

export const operations: OperationDef[] = [
  // messaging
  listChats, getChat, listMessages, sendMessage, startChat, markChatRead,
  getMessage, deleteMessage, markMessageRead, forwardMessage, editMessage,
  listParticipants, manageParticipants,
  // network
  getProfile, getCompany, listConnections, listInvitations, sendInvitation, respondInvitation, followUser,
  // posts
  listPosts, getPost, createPost, listComments, addComment,
  // engagement
  linkedinReact, linkedinReactToMessage, listReactions, listUserComments, listUserReactions, listFollowers,
  // search + meta
  searchLinkedIn, getSearchParameters, whoami,
];
