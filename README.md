# ESBR Bot: A discord bot for HTB teams

Minimalistic bot for HTB teams with simple commands and crons.

# Installation
1. Create a `.env` file with below settings:
    ```
    DISCORD_TOKEN=<discord_token>
    HTB_BEARER=Bearer <jwt>
    ``` 
2. The JWT token can be found by loggin in to app.hackthebox.eu and getting them from any network call header.

# Commands:

| Command Syntax                   | Description  |
| -----------------------| -----|
| -teamrank | Get htb team rank |
| -lasthacks \<numdays\> [by \<user\>] [limit \<number\>] | Get htb box completion stats |
| -contributions      | Get contributions in points sorted by HOF rank |
| -htbutil usermap \<htbusername\> \<discord\>      | Map discord and HTB username for pings |
| -contributions      | Get contributions in points sorted by HOF rank |
| -leaderboard | Contributions alias | 
|-hello | sends 'world' |
| -help | Minimalistic help | 

Note: More commands on the way

# Listeners/Crons:

| Listener/cron                   | Description  |
| -----------------------| -----|
| Hacktivity | Polls every 10mins to check if someone on your team hacked any box or challenge or not | 
| Hack Reminder | Polls every 12 hours to remind teammember who are not doing active boxes for a while | 