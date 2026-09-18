NICOLE MARIE SALON — WEBSITE SETUP
===================================

1) HOSTING
   This is a static site: one index.html file plus an assets/img folder.
   Upload the whole "site" folder as-is to any host (Netlify, GoDaddy,
   Squarespace's file hosting, etc). No build step required.

2) CONNECT CALENDLY (booking)
   - Create a free account at https://calendly.com and set up an event
     type (e.g. "Haircut Consultation", 30–60 min).
   - Copy your event link — it looks like:
       https://calendly.com/your-name/haircut
   - Open index.html, find this line near the bottom of the file
     (search for "REPLACE-WITH-YOUR-CALENDLY-LINK"):

       var CALENDLY_URL = "https://calendly.com/REPLACE-WITH-YOUR-CALENDLY-LINK/consultation";

   - Replace the URL with your real Calendly link and save. That's the
     only edit needed — both the embedded calendar on the page and the
     "Book now" popup button use this same line.
   - Tip: if you want a different Calendly event type per service
     (e.g. one for color, one for a cut), the simplest approach is a
     single "General booking / consultation" event type, since
     Calendly lets clients pick the reason for their visit as a
     question on the booking form.

3) UPDATE PRICING, HOURS & COPY
   All service names, prices, and hours in index.html are placeholders
   marked as such on the page. Search the file for the section you
   want to edit — each one is commented with its section name
   (Services, Hours, FAQ, About, etc.) and is plain HTML, so you can
   edit the text directly even without a developer.

4) PHOTOS
   All photos live in assets/img/. To swap or add one, drop a new
   .jpg into that folder and update the matching <img src="..."> tag
   in index.html.

5) GOING LIVE CHECKLIST
   [ ] Real Calendly link added
   [ ] Hours confirmed
   [ ] Prices confirmed
   [ ] Phone number double-checked: (727) 771-7755
   [ ] Instagram handle double-checked: @nicolemariesalonllc
