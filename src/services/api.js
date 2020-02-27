import { create } from 'apisauce';

const api = create({
});

api.addResponseTransform(response => {
    if (!response.ok || response.status != 200) throw response;
})

api.addAsyncRequestTransform(request => async() => {
    request.headers['Content-Type'] = 'application/json';
    // aqui tbm vai o authorization
});

export default api;


//getBooks: 'https://00pnt64qye.execute-api.us-east-1.amazonaws.com/default/getBooks',
//saveBook: 'https://xipadu0k1d.execute-api.us-east-1.amazonaws.com/default/newBook',