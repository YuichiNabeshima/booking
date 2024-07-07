🚧 This app is WIP 🚧

# About
This is an application of simply booking web site which is for portfolio not for monetize.
I created this app to show my developing skill.

# Language and Libraries
- Remix
- TypeScript
- React
- Prisma
- Postgresql
- postCSS
- zod
- remix-auth
- remix-auth-form
- Docker

# Why I use Remix
I have never used Remix in practical work, but I am really intersted in it now.
Modern web development requires the frontend framework such as the Reactjs which makeing UI rich.
On the other hand, I prefer monolithic design than microservice one.
I thought that Remix can makes these two requirements of mine satisfied, and I have believed that it was true.

# App's overview
Users can make a reservation like of restaurant, and client user can register own restaurant and make sure user's reservation.

## Register client
First, the client registers their restaurant.<br>
https://booking.fly.dev/client/signup/
![instraction_img_01](https://github.com/YuichiNabeshima/booking/assets/124149921/5fed0bec-4c89-4561-a9d4-29a12c025782)


## Add courses
Next, add the courses for your restaurant.
Enter the name and duration for each course.<br>
https://booking.fly.dev/client/mypage/setting/
![instraction_01](https://github.com/YuichiNabeshima/booking/assets/124149921/4a5b110e-0a67-4b36-913f-964eccf10ce8)


## Set available number of seat
Then set the number of available reservations for each hour and day of the week.
![instraction_02](https://github.com/YuichiNabeshima/booking/assets/124149921/8056e176-fe5f-4258-a88c-f77eda9454dd)

## User can reserve 
Once the client has done this, users will be able to make reservations at any available times with number of people, course and type of seat.<br>
https://booking.fly.dev/booking/9/
![instraction_03](https://github.com/YuichiNabeshima/booking/assets/124149921/429911d8-772a-4a21-a9be-a36781b775a5)

## Enter user's name and email
After selecting the date and time and sending form, a modal will appear where user can enter user's name and email address.
A confirmation email will be sent to the email address you enter here.
![instraction_04](https://github.com/YuichiNabeshima/booking/assets/124149921/bafdffe5-87bc-409d-91e3-34ade20c9c5e)

## Sent email and determain reservation
The confirmation email contains a link to confirm the reservation, which can be used to open the reservation confirmation page and confirm the reservation.
(User can send an email, but since this is a prototype, a link to the reservation confirmation page is temporarily displayed in the send completion modal.)
![instraction_05](https://github.com/YuichiNabeshima/booking/assets/124149921/c9df7297-a295-4e83-b6a9-bf63fcd2f9a5)

## Client can see the reservation
Once the reservation is completed, the client can view the reservation list and modal for that day on their My Page.<br>
https://booking.fly.dev/client/mypage/
![instraction_06](https://github.com/YuichiNabeshima/booking/assets/124149921/8a1bbff5-50cf-491b-8138-e8cca33409a2)

## Test account
Log in to the test client and try it out.<br>
https://booking.fly.dev/client/login/<br>
Email
```
sample@sample.com
```

Password
```
password1
```

Test restaurant reservation page<br>
https://booking.fly.dev/booking/9/
