import request, {getConfig, request2} from '../../utils/request';

export async function searchPersonByID2(id) {
  const req = await request();
  return new Promise( (resolve) => {
    req.get(`/person?personid=${id}`).then((response) => {
      resolve(response.data);
    })
  });
}

export async function searchPersonByID(id) {
  const conf = await getConfig();
  return new Promise( (resolve) => {
    request2.get(`/person?personid=${id}`, conf).then((response) => {
      resolve(response.data);
    })
  });
}

export async function searchPersonByName(name) {
  const conf = await getConfig();
  return new Promise( (resolve) => {
    request2.get(`/person/personname?txt=${name}`, conf).then((response) => {
      resolve(response.data);
    })
  });
}

/*
export default {
  async one() {

  },
  async two() {

  },
}
*/
