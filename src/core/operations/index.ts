import type { OperationDef } from "./types.js";
import {
  deleteMessage,
  editMessage,
  forwardMessage,
  getAttachmentLinks,
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
  updateChat,
} from "./messaging.js";
import {
  followUser,
  getCompany,
  getProfile,
  listConnections,
  listInvitations,
  removeConnection,
  respondInvitation,
  sendInvitation,
} from "./network.js";
import { addComment, createPost, getPost, listComments, listPosts } from "./posts.js";
import { deleteComment, deletePost, editComment, editPost, updateProfile } from "./content.js";
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
  listParticipants, manageParticipants, getAttachmentLinks, updateChat,
  // network
  getProfile, getCompany, listConnections, listInvitations, sendInvitation, respondInvitation, followUser,
  removeConnection,
  // posts
  listPosts, getPost, createPost, listComments, addComment,
  // editing own content
  editPost, deletePost, editComment, deleteComment, updateProfile,
  // engagement
  linkedinReact, linkedinReactToMessage, listReactions, listUserComments, listUserReactions, listFollowers,
  // search + meta
  searchLinkedIn, getSearchParameters, whoami,
];
