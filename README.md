# backdoor-quest

## Quest API Setup

To start **`quest-api`**, follow these steps:

1. Go to the storage link and download the credentials: [google-auth](<https://drive.google.com/file/d/15k47-uiU4eYX_7Qp0G9tvEKN6Vlh_ZR-/view>) 
 and [spring.mail.password](<https://drive.google.com/file/d/1zaQUKhcbsFgTBXWtjnfSWTDg0bRTXEt_/view>).
2. Create a folder named **`.google`** and place the **`google-auth.json`** file inside.
3. In the **`quest-api`** folder, navigate to **`resources`** and add the password in the **`application.yaml`** file under the **`spring.mail.password`** field.

### Run

```sh
cd be-infra; docker-compose up -d; cd ..
```
