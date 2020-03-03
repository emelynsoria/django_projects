import { date } from "./exports";

const content_type = { "Content-Type": "application/json" };
const auth = { Authorization: "Bearer " + localStorage.getItem("token") };
const header_content = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token")
};

// ---------------- USERS ----------------
const register = (fname, lname, uname, pass) => {
  var request = fetch("/api/users/", {
    method: "POST",
    headers: content_type,
    body: JSON.stringify({
      first_name: fname,
      last_name: lname,
      username: uname,
      password: pass
    })
  }).then(func => func.json());
  return request;
};

const login = (uname, pass) => {
  var request = fetch("/api/token/", {
    method: "POST",
    headers: content_type,
    body: JSON.stringify({
      username: uname,
      password: pass
    })
  }).then(cont => cont.json());
  return request;
};

const changePassword = (oldPass, newPass, confirmPass) => {
  var request = fetch("/api/change_password/", {
    method: "PATCH",
    headers: header_content,
    body: JSON.stringify({
      old_password: oldPass,
      password: newPass,
      confirmed_password: confirmPass
    })
  }).then(func => func.json());
  return request;
};

// ---------------------------------------

// GET all users
const getAllUsers = () => {
  var request = fetch(`/api/users/`).then(val => val.json());
  return request;
};

// GET user details
const getUserDetails = id => {
  var request = fetch(`/api/users/${id}/`).then(val => val.json());
  return request;
};

// PATCH
const updateUser = (id, data) => {
  var request = fetch(`/api/users/${id}/`, {
    method: "PATCH",
    body: data,
    headers: header_content
  }).then(func => func.json);
  return request;
};

// ---------------- PROFILE ----------------
// GET all profiles
const getAllProfile = () => {
  var request = fetch(`/api/profile/`).then(val => val.json());
  return request;
};

// GET user profile
const getUserProfile = userId => {
  var request = fetch(`/api/user/profile?user=${userId}`).then(val =>
    val.json()
  );
  return request;
};

// GET profile content
const getProfileDetails = id => {
  var request = fetch(`/api/profile/${id}/`).then(val => val.json());
  return request;
};

// POST
const postProfile = data => {
  var request = fetch(`/api/profile/`, {
    method: "POST",
    body: data
  }).then(func => func.json);
  return request;
};

// PATCH
const updateProfile = (id, data) => {
  var request = fetch(`/api/profile/${id}/`, {
    method: "PATCH",
    body: data,
    headers: auth
  }).then(func => func.json);
  return request;
};

// ---------------- CONTACTS ----------------
// GET user contact list
const getUserContacts = profileId => {
  var request = fetch(`/api/user/contacts?profile=${profileId}`).then(val =>
    val.json()
  );
  return request;
};

// POST
const addContact = (type, details, profileId) => {
  var request = fetch(`/api/contact/`, {
    method: "POST",
    body: JSON.stringify({
      contact_type: type,
      contact_details: details,
      profile: profileId
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// PATCH
const updateContact = (id, contactType, contactDetails, profileId) => {
  var request = fetch(`/api/contact/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      contact_type: contactType,
      contact_details: contactDetails,
      profile: profileId
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// DELETE
const removeContact = id => {
  var request = fetch(`/api/contact/${id}/`, {
    method: "DELETE",
    headers: auth
  }).then(val => val.json());
  return request;
};

// ---------------- OTHER CONTACTS ----------------
// GET user other contacts
const getUserOtherContacts = profileId => {
  var request = fetch(
    `/api/user/other_contacts?profile=${profileId}`
  ).then(val => val.json());
  return request;
};

// POST
const addOtherContact = (site, link, profileId) => {
  var request = fetch(`/api/other_contacts/`, {
    method: "POST",
    body: JSON.stringify({
      site: site,
      link: link,
      profile: profileId
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// PATCH
const updateOtherContact = (id, site, link, profileId) => {
  var request = fetch(`/api/other_contacts/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      site: site,
      link: link,
      profile: profileId
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// DELETE
const removeOtherContact = id => {
  var request = fetch(`/api/other_contacts/${id}/`, {
    method: "DELETE",
    headers: auth
  });
  return request;
};

// ---------------- EDUCATION ----------------
// GET user education list
const getUserEducation = userId => {
  var request = fetch(`/api/user/education?user=${userId}`).then(val =>
    val.json()
  );
  return request;
};

// GET education details
const getEducationDetails = id => {
  var request = fetch(`/api/education/${id}/`).then(val => val.json());
  return request;
};

// POST
const addEducation = (
  schoolName,
  durationFrom,
  durationTo,
  type,
  description,
  userId
) => {
  var request = fetch(`/api/education/`, {
    method: "POST",
    body: JSON.stringify({
      school_name: schoolName,
      school_duration: durationFrom + " – " + durationTo,
      school_type: type,
      school_description: description,
      user: userId
    }),
    headers: header_content
  }).then(func => func.json());
  return request;
};

// PATCH
const updateEducation = (
  id,
  schoolName,
  durationFrom,
  durationTo,
  schoolType,
  schoolDescription
) => {
  var request = fetch(`/api/education/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      school_name: schoolName,
      school_duration: durationFrom + " – " + durationTo,
      school_type: schoolType,
      school_description: schoolDescription
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// DELETE
const removeEducation = id => {
  var request = fetch(`/api/education/${id}/`, {
    method: "DELETE",
    headers: header_content
  }).then(val => val.json());
  return request;
};

// ---------------- EXPERIENCE ----------------
// GET user work experience list
const getUserExperience = userId => {
  var request = fetch(`/api/user/work_experience?user=${userId}`).then(val =>
    val.json()
  );
  return request;
};

// GET work experience details
const getExperienceDetails = id => {
  var request = fetch(`/api/work_experience/${id}/`).then(val => val.json());
  return request;
};

// POST
const addExperience = (
  jobTitle,
  description,
  location,
  dateFrom,
  dateTo,
  userId
) => {
  var request = fetch(`/api/work_experience/`, {
    method: "POST",
    body: JSON.stringify({
      job_title: jobTitle,
      work_description: description,
      location: location,
      inclusive_dates: date.format(new Date(dateFrom)) + " – " + dateTo,
      user: userId
    }),
    headers: header_content
  }).then(func => func.json());
  return request;
};

// PATCH
const updateExperience = (
  id,
  newJobTitle,
  newWorkDetails,
  newLocation,
  newDateFrom,
  newDateTo
) => {
  var request = fetch(`/api/work_experience/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      job_title: newJobTitle,
      work_description: newWorkDetails,
      location: newLocation,
      inclusive_dates: newDateFrom + " – " + newDateTo
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// DELETE
const removeExperience = id => {
  var request = fetch(`/api/work_experience/${id}/`, {
    method: "DELETE",
    headers: header_content
  }).then(val => val.json());
  return request;
};

// ---------------- SKILLS ----------------
// GET user skills list
const getUserSkills = userId => {
  var request = fetch(`/api/user/skills?user=${userId}`).then(val =>
    val.json()
  );
  return request;
};

// POST
const addSkill = formData => {
  var request = fetch(`/api/skills/`, {
    method: "POST",
    body: formData,
    headers: auth
  }).then(func => func.json());
  return request;
};

// DELETE
const removeSkill = skillId => {
  var request = fetch(`/api/skills/${skillId}/`, {
    method: "DELETE",
    headers: auth
  }).then(val => val.json());
  return request;
};

// PATCH
const updateSkill = (id, formData) => {
  var request = fetch(`/api/skills/${id}/`, {
    method: "PATCH",
    body: formData,
    headers: auth
  }).then(func => func.json);
  return request;
};

// ---------------- PROJECTS ----------------
// GET user projects list
const getUserProjects = userId => {
  var request = fetch(`/api/user/projects?user=${userId}`).then(val =>
    val.json()
  );
  return request;
};

// GET project details
const getProjectDetails = () => {
  var request = fetch(
    `/api/projects/${localStorage.getItem("projectId")}`
  ).then(val => val.json());
  return request;
};

// POST
const addProject = formData => {
  var request = fetch(`/api/projects/`, {
    method: "POST",
    body: formData,
    headers: auth
  }).then(func => func.json());
  return request;
};

// PATCH
const updateProject = formData => {
  var request = fetch(`/api/projects/${localStorage.getItem("projectId")}/`, {
    method: "PATCH",
    body: formData,
    headers: auth
  }).then(func => func.json);
  return request;
};

// DELETE
const removeProject = () => {
  var request = fetch(`/api/projects/${localStorage.getItem("projectId")}/`, {
    method: "DELETE",
    headers: header_content
  }).then(val => val.json());
  return request;
};

// ---------------- AWARDS ----------------
// GET user awards list
const getUserAwards = userId => {
  var request = fetch(`/api/user/awards?user=${userId}`).then(val =>
    val.json()
  );
  return request;
};

// GET award details
const getAwardDetails = id => {
  var request = fetch(`/api/awards/${id}/`).then(val => val.json());
  return request;
};

// PATCH
const updateAward = (id, awardTitle, awardDetail, date) => {
  var request = fetch(`/api/awards/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      award_title: awardTitle,
      award_detail: awardDetail,
      award_date: date
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// POST
const addAward = (awardTitle, awardDetail, awardDate, userId) => {
  var request = fetch(`/api/awards/`, {
    method: "POST",
    body: JSON.stringify({
      award_title: awardTitle,
      award_detail: awardDetail,
      award_date: awardDate,
      user: userId
    }),
    headers: header_content
  }).then(func => func.json());
  return request;
};

// DELETE
const removeAward = id => {
  var request = fetch(`/api/awards/${id}/`, {
    method: "DELETE",
    headers: header_content
  }).then(val => val.json());
  return request;
};

// ---------------- BLOGS ----------------
// GET all blogs
const getAllBlogs = () => {
  var request = fetch("/api/blog/").then(val => val.json());
  return request;
};

// GET user blog list
const getUserBlogs = (userId, bool) => {
  var request = fetch(
    `/api/user/blogs?user=${userId}&is_draft=${bool}`
  ).then(val => val.json());
  return request;
};

// GET blog details
const getBlogDetails = id => {
  var request = fetch(`/api/blog/${id}/`).then(val => val.json());
  return request;
};

// PATCH
const updateBlog = (id, data) => {
  var request = fetch(`/api/blog/${id}/`, {
    method: "PATCH",
    body: data,
    headers: auth
  }).then(func => func.json);
  return request;
};

// POST
const postBlog = formData => {
  var request = fetch(`/api/blog/`, {
    method: "POST",
    body: formData,
    headers: auth
  }).then(func => func.json());
  return request;
};

// DELETE
const removeBlog = blogId => {
  var request = fetch(`/api/blog/${blogId}/`, {
    method: "DELETE",
    headers: auth
  });
  return request;
};

// ---------------- COMMENTS ----------------
// GET blog's comment list
const getBlogComments = (userId, postId) => {
  var request = fetch(
    `/api/blog_comments?user=${userId}&post=${postId}`
  ).then(val => val.json());
  return request;
};

// GET post's comment list
const getPostComments = id => {
  var request = fetch(`/api/post_comments/${id}`).then(val => val.json());
  return request;
};

// GET comment details
const getCommentDetails = id => {
  var request = fetch(`/api/comments/${id}/`).then(val => val.json());
  return request;
};

// POST
const postComment = (user, post, content) => {
  var request = fetch(`/api/comments/`, {
    method: "POST",
    body: JSON.stringify({
      user: user,
      post: post,
      content: content
    }),
    headers: header_content
  }).then(func => func.json());
  return request;
};

// PATCH
const updateComment = (id, user, post, content) => {
  var request = fetch(`/api/comments/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      user: user,
      post: post,
      content: content
    }),
    headers: header_content
  }).then(func => func.json);
  return request;
};

// DELETE
const removeComment = id => {
  var request = fetch(`/api/comments/${id}/`, {
    method: "DELETE",
    headers: header_content
  });
  return request;
};

export {
  register,
  login,
  changePassword,
  getAllUsers,
  getUserDetails,
  updateUser,
  getAllProfile,
  getUserProfile,
  getProfileDetails,
  postProfile,
  updateProfile,
  getUserContacts,
  addContact,
  updateContact,
  removeContact,
  getUserOtherContacts,
  addOtherContact,
  updateOtherContact,
  removeOtherContact,
  getUserEducation,
  getEducationDetails,
  addEducation,
  updateEducation,
  removeEducation,
  getUserExperience,
  getExperienceDetails,
  addExperience,
  updateExperience,
  removeExperience,
  getUserSkills,
  addSkill,
  removeSkill,
  updateSkill,
  getUserProjects,
  getProjectDetails,
  addProject,
  updateProject,
  removeProject,
  getUserAwards,
  getAwardDetails,
  updateAward,
  addAward,
  removeAward,
  getAllBlogs,
  getUserBlogs,
  getBlogDetails,
  updateBlog,
  postBlog,
  removeBlog,
  getBlogComments,
  getPostComments,
  // getUserBlogComments,
  getCommentDetails,
  postComment,
  updateComment,
  removeComment
};
