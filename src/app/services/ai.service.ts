import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(private http: HttpClient) { }

  askAi(text: string, type: string = "") {
      var prompt = "";
      switch (type){
        case "Social":
          prompt += `Generate social media post content for topic - ${text} in less than 280 characters. `

      }
     
      prompt += `Note: Avoid using single or double quotes or any other enclosing characters, don't self refrence, don't tell what you are doing`


      let messages  = [
        {"role": "system", "content": "You are a content writer"},
        {"role": "user", "content": prompt}
      ]

      let data ={
        "model": "Qwen/Qwen1.5-110B-Chat",
        "messages": messages
      }
      // https://api.together.ai/models
      

      return this.http.post("https://api.together.xyz/v1/chat/completions", data, {headers: {'Authorization': 'Bearer f41240dfcbb7c9edb04341ac0b96fe6f66148352296b1b10ab6ad1826bf5c874'}})

    }
}