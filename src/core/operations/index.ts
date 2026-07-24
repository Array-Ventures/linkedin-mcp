import type { OperationDef } from "./types.js";
import { getChat, listChats, listMessages, markChatRead, sendMessage, startChat } from "./messaging.js";
import { followUser, getCompany, getProfile, listConnections, listInvitations, respondInvitation, sendInvitation } from "./network.js";
import { addComment, createPost, getPost, listComments, listPosts, reactToPost } from "./posts.js";
import { getSearchParameters, searchLinkedIn } from "./search.js";
import { whoami } from "./account.js";

export const operations: OperationDef[] = [
  // messaging
  listChats, getChat, listMessages, sendMessage, startChat, markChatRead,
  // network
  getProfile, getCompany, listConnections, listInvitations, sendInvitation, respondInvitation, followUser,
  // posts
  listPosts, getPost, createPost, listComments, addComment, reactToPost,
  // search + meta
  searchLinkedIn, getSearchParameters, whoami,
];
