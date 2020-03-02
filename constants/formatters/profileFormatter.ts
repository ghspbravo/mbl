import Formatter from "./rootFormatter";
import pass from '../../assets/pass.png';

export interface userInterface {
  id?: string,
  name?: string,
  photo?: string,
  birthday?: Date,
  roles?: { id: string, name: string }[],
  education?: string,
  workList?: { name: string, start: string, end: string }[],
  socialLinks?: string[],
  spheresList?: { id: string, name: string }[],
  achievements?: string,
  interests?: string,
  wishes?: string,
}

export class ProfileFormatter extends Formatter {
  constructor() {
    super();
  }

  async formatCurrentUser(fetchPromise: Promise<Response>) {
    // TODO: format current user
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) { return; }
        const {
          id, firstName, surName, middleName, birthDate,
          photo, workExperiences, socialNetWorks, profileTypes,
          achivements, wantToLearn, interests, education,
          skills, portfolio
        } = contents;
        this.body = {
          id,
          name: `${surName} ${firstName} ${middleName || ""}`.trimEnd(),
          photo: photo || pass, birthday: birthDate,
          roles: profileTypes || [],
          education, workList: workExperiences,
          socialLinks: socialNetWorks || [],
          spheresList: skills || [],
          achievements: achivements,
          interests, wishes: wantToLearn,
        };
      })

    return {
      status: this.status,
      body: this.body
    }
  }
}