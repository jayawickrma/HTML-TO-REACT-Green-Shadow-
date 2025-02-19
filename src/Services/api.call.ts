import axios from 'axios'

class ApiCall{
    baseUrl: string = "http://localhost:3000/api/v1"


     api = axios.create({
        baseURL : this.baseUrl
    })

    async postApiCallWithFromData(url: string, data: any){
        try {
            const token = localStorage.getItem("token")
            return await this.api.post(url, data,{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        }catch (err){
            return err;
        }
    }
    async patchApiCallWithFormData(url:string,data:FormData){
        try {
            const token = localStorage.getItem("token")
            return await this.api.patch(url, data,{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        }catch (err){
            return err;
        }
    }
    async postApiCall(url:string,data:any){
        try {
            const token = localStorage.getItem("token")
            return await this.api.post(url, data,{
                headers : {
                    Authorization :`Bearer ${token}`
                }
            });
        }catch (err){
            console.error("Failed to save", err);
            return err;
        }
    }

    async patchApiCall(url:string,data:any){
        try {
            const token = localStorage.getItem("token")
            return await this.api.patch(url, data,{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        }catch (err){
            return err;
        }
    }
    async deleteApiCall(url:string,id:string){
        try {
            const token = localStorage.getItem("token")
            return await this.api.delete(url,{
                params:{
                    id : id
                },
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        }catch (err){
            return err;
        }
    }
    async getApiCall(url:string){
        try {
            const token = localStorage.getItem("token")
            return await this.api.get(url,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
        }catch (err){
            return err;
        }
    }
}
const Api_call = new ApiCall();
export default Api_call;
