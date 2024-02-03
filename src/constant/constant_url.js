class Url {
  static baseUrl = `${process.env.NEXT_BASE_URL}`;
  static student_home = `/student/home`;
  static admin_home = `/admin/home`;
  static admin_report = `/admin/reports`;
  static admin_progress = `/admin/progress`;
  static admin_setting = `/admin/settings`; //berisi crud untuk category
  static admin_home = `/admin/home`;
  static login = "/auth/login";
}
export default Url;
