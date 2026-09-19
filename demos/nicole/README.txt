NICOLE MARIE SALON — WEBSITE SETUP
===================================

1) HOSTING
   This is a static site: one index.html file plus an assets/img folder.
   Upload the whole "site" folder as-is to any host (Netlify, GoDaddy,
   Squarespace's file hosting, etc). No build step required.

2) BOOKING
   Every "Book now" / "Book on Vagaro" button links straight to:
       https://www.vagaro.com/nicolemariesalonllc
   No setup needed — if that URL ever changes, search index.html for
   "vagaro.com/nicolemariesalonllc" and replace it everywhere it appears.

3) REVIEWS SECTION
   The quotes and star ratings in the "What clients are saying" section
   are summarized from real, public reviews on Yelp, Facebook, and
   Nextdoor as of the site's build date. Review counts and averages on
   those platforms change over time — refresh the numbers periodically
   so the page stays accurate, and always keep attributions truthful
   (only use real reviews, never invented ones).

4) UPDATE PRICING, HOURS & COPY
   All service names, prices, and hours in index.html are placeholders
   marked as such on the page. Search the file for the section you
   want to edit — each one is commented with its section name
   (Services, Hours, FAQ, About, etc.) and is plain HTML, so you can
   edit the text directly even without a developer.

5) PHOTOS
   All photos live in assets/img/. To swap or add one, drop a new
   .jpg into that folder and update the matching <img src="..."> tag
   in index.html.

6) GOING LIVE CHECKLIST
   [ ] Vagaro link double-checked
   [ ] Hours confirmed
   [ ] Prices confirmed
   [ ] Review quotes/ratings refreshed against current Yelp/Facebook/Nextdoor
   [ ] Phone number double-checked: (727) 771-7755
   [ ] Instagram handle double-checked: @nicolemariesalonllc
