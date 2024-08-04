export async function querySuper(url, params) {
  return request(url, {
    params,
  });
}

export async function removeSomeSuper(url, params: { key: number[] }) {
  return request(url, {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeSuper(url, params: { key: number[] }) {
  return request(url, {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSuper(url, params) {
  return request(url, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSuper(url, params) {
  return request(url, {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}
