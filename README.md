# Hajusrakendus_3_todo-frontend-vanilla

Harjutus 3 - Ülesannete nimekirja klientrakendus (ToDo)
Mõõdame timeriga?

Kirjeldus
Luua ülesannete nimekirja rakendus kus saab lisada tegevusi või meelespeasid. Igat ülesannet või tegevust peab saama märkida tehtuks, vajadusel muuta ning kustutada. Võid ka järgmises peatükis oleva rakenduse alla laadida ja käima panna kui see aitab paremini aru saada mida rakendus teeb.

Ülesannete nimekirja jaoks on olemas juba server-rakendus (REST API), mis suudab ülesandeid salvestada. API ja selle juhend asuvad aadressil http://demo2.z-bit.ee/

Esimene samm oleks mõne HTTP graafilise tööriistaga (Postman, Insomnia, VSC Thunder Client) teha endale kasutaja demo2 serverisse. Siis proovida teha mõned Taskid ja kontrollida kas need salvestuvad. Alles siis proovida teha samu päringuid JavaScriptis Reacti klientrakenduses.

Klientrakendus
Kui oled juba API-ga katsetusi teinud soovitan võtta sul põhjaks ühe näidisrakenduse millel on UI juba tehtud. Pilt näidisrakendusest

Mul on pakkuda kaks näidisrakendust. Üks on tehtud React raamistikuga, teine on tehtud vanilla JavaScriptiga.
Vanilla tähendab, et see variant ei kasuta ühtegi raamistiku. Pole vaja midagi installida ega seadistada, lihtsalt pane index.html käima ja see töötab. Vanillast võib alguses kergem aru saada olla aga see pole suurte projektide jaoks kõige mugavam.

React rakendus
Vanilla JS
Nüüd nendes näidistes kõik töötab kuniks sa värskendad lehte, selgub et midagi ei salvestata. Sa pead lisama koodile HTTP päringud mis saadaksid andmed serverisse kui keegi ülesandeid muudab. Näiteks kustuta nuppu vajutades saadetakse HTTP sõnum serverile, et üks ülesanne tuleb ära kustutada.

Kui React sulle ei sobi võid ehitada ise klientrakenduse endale sobivale platvormile või isegi käsurea rakendusena. Hajusrakenduste üks boonustest on see, et pole vahet mis keeles rakendust kirjutad, suhtlema saab need ikka panna. Klientrakendust (front-end) võib ise ehitada aga server-rakendust (back-end) selles ülesandes ise ei ehita - peame kasutama olemasolevat.
