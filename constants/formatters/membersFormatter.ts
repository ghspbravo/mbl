import Formatter from "./rootFormatter";
import pass from '../../assets/pass.png';

interface membersApi {
  id: number,
  photo: string | null,
  profileTypes: any[],
  firstName: string,
  surName: string,
  middleName: string,
  birthDate: string
}

export interface shortMember {
  id: number,
  photo: string,
  name: string,
  company?: string,
  role: string,
}

export class MembersFormatter extends Formatter {
  constructor() {
    super();
  }

  async formatList(fetchPromise: Promise<Response>) {
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) { return; }
        const membersList: membersApi[] = contents.news;

        this.body = {
          hasNext: contents.isExistNextPage,
          members: membersList.map(membersItem => {
            const { id, photo, profileTypes, firstName, surName, middleName } = membersItem;
            return {
              id, name: `${surName} ${firstName} ${middleName || ""}`.trimEnd(),
              photo: photo || pass, role: profileTypes ? profileTypes[0]?.Name : ""
            }
          })
        }
      });

    return {
      status: this.status,
      body: this.body
    }
  }
}