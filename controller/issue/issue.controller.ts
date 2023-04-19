import { Response, NextFunction } from "express";
import IssueService from "./issue.service";

const issueService = new IssueService();
class IssueController {
  /**
   * create issue
   * @param {*} req    HTTP request object
   * @param {*} res    HTTP response object
   * @param {*} next   Callback argument to the middleware function
   */

  createIssue(req: any, res: Response, next: NextFunction) {
    const { body: request, user: userDetails } = req;

    issueService
      .createIssue(request, userDetails)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
   * get issues list
   * @param {*} req    HTTP request object
   * @param {*} res    HTTP response object
   * @param {*} next   Callback argument to the middleware function
   */
  getIssuesList(req: any, res: Response, next: NextFunction) {
    const { query = {}, user } = req;

    issueService
      .getIssuesList(user, query)
      .then((response: any) => {
        if (!response.error) {
          res.json({ ...response });
        } else
          res.status(404).json({
            totalCount: 0,
            issues: [],
            error: response.error,
          });
      })
      .catch((err: any) => {
        next(err);
      });
  }
}

export default IssueController;