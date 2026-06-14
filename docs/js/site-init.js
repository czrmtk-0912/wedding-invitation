// @ts-nocheck
(function () {
    "use strict";

    var cfg = window.WEDDING_CONFIG;
    if (!cfg) {
        return;
    }

    function setText(sel, text) {
        var el = document.querySelector(sel);
        if (el && text != null) {
            el.textContent = text;
        }
    }

    function setAttr(sel, attr, value) {
        var el = document.querySelector(sel);
        if (el && value != null) {
            el.setAttribute(attr, value);
        }
    }

    function setTextAll(sel, text) {
        document.querySelectorAll(sel).forEach(function (el) {
            if (text != null) {
                el.textContent = text;
            }
        });
    }

    document.title =
        "Wedding Invitation " + cfg.groomName + " & " + cfg.brideName;

    setTextAll("[data-bind=groomName]", cfg.groomName);
    setTextAll("[data-bind=brideName]", cfg.brideName);
    setTextAll("[data-bind=ceremonyDate]", cfg.ceremonyDate);
    setText("[data-bind=venueName]", cfg.venueName);
    setText("[data-bind=venueAddress]", cfg.venueAddress);
    setText("[data-bind=greetingTitle]", cfg.greeting.title);
    setText("[data-bind=profileHeading]", cfg.labels.profileHeading);
    setText("[data-bind=storyHeading]", cfg.labels.storyHeading);
    setText("[data-bind=countdownHeading]", cfg.labels.countdownHeading);
    setText("[data-bind=eventsHeading]", cfg.labels.eventsHeading);
    setTextAll("[data-bind=ceremonyTitle]", cfg.labels.ceremonyTitle);
    setText("[data-bind=receptionTitle]", cfg.labels.receptionTitle);
    setText("[data-bind=venueTitle]", cfg.labels.venueTitle);
    setTextAll("[data-bind=gatherTitle]", cfg.labels.gatherTitle);
    setText("[data-bind=gatherNotice]", cfg.labels.gatherNotice);
    setText("[data-bind=gatherAudienceLabel]", cfg.labels.gatherAudienceLabel);
    setText("[data-bind=familyTabLabel]", cfg.labels.familyTabLabel);
    setText("[data-bind=friendTabLabel]", cfg.labels.friendTabLabel);
    setTextAll("[data-bind=timeLabel]", cfg.labels.timeLabel);
    setTextAll("[data-bind=placeLabel]", cfg.labels.placeLabel);
    setText("[data-bind=ceremonyVenueLabel]", cfg.labels.ceremonyVenueLabel);
    setText("[data-bind=receptionCheckInLabel]", cfg.labels.receptionCheckInLabel);
    setText("[data-bind=receptionVenueLabel]", cfg.labels.receptionVenueLabel);
    setText("[data-bind=receptionVenueName]", cfg.event.receptionVenueName);
    setText("[data-bind=receptionVenueDetail]", cfg.event.receptionVenueDetail);
    setText("[data-bind=mapsLinkLabel]", cfg.labels.mapsLinkLabel);
    setText("[data-bind=accessLinkLabel]", cfg.labels.accessLinkLabel);
    setText("[data-bind=contactLabel]", cfg.labels.contactLabel);
    setTextAll("[data-bind=dateLabel]", cfg.labels.dateLabel);
    setTextAll("[data-bind=startLabel]", cfg.labels.startLabel);
    setText("[data-bind=familyGatherTime]", cfg.event.familyGatherTime);
    setText("[data-bind=familyGatherPlace]", cfg.event.familyGatherPlace);
    setText("[data-bind=friendGatherTime]", cfg.event.friendGatherTime);
    setText("[data-bind=friendGatherPlace]", cfg.event.friendGatherPlace);
    setText("[data-bind=ceremonyVenueName]", cfg.event.ceremonyVenueName);
    setText("[data-bind=ceremonyVenueDetail]", cfg.event.ceremonyVenueDetail);
    setText("[data-bind=ceremonyTime]", cfg.event.ceremonyTime);
    setText("[data-bind=receptionCheckInTime]", cfg.event.receptionCheckInTime);
    setText("[data-bind=receptionCheckInPlace]", cfg.event.receptionCheckInPlace);
    setText("[data-bind=receptionTime]", cfg.event.receptionTime);
    setText("[data-bind=rsvpTitle]", cfg.rsvp.title);
    setText("[data-bind=rsvpLead]", cfg.rsvp.lead);
    setText("[data-bind=rsvpDeadlineLabel]", cfg.rsvp.deadlineLabel);
    setText("[data-bind=rsvpDeadline]", cfg.rsvp.deadline);
    setText("[data-bind=rsvpButton]", cfg.rsvp.buttonText);
    setText("[data-bind=rsvpNote]", cfg.rsvp.note);

    setAttr("#countdown", "data-countdown-target", cfg.countdownTargetIso);

    var mapsLink = document.getElementById("mapsLink");
    if (mapsLink && cfg.mapsUrl) {
        mapsLink.href = cfg.mapsUrl;
    }
    var accessLink = document.getElementById("accessLink");
    if (accessLink && cfg.accessUrl) {
        accessLink.href = cfg.accessUrl;
    }

    var contactLink = document.getElementById("contactPhoneLink");
    if (contactLink && cfg.event.contactPhone) {
        contactLink.href = "tel:" + cfg.event.contactPhone.replace(/-/g, "");
        contactLink.textContent = cfg.event.contactPhone;
    }

    var rsvpBtn = document.getElementById("rsvpFormLink");
    if (rsvpBtn && cfg.googleFormUrl) {
        rsvpBtn.href = cfg.googleFormUrl;
    }

    var greetingEl = document.getElementById("greetingParagraphs");
    if (greetingEl && cfg.greeting.paragraphs) {
        greetingEl.innerHTML = "";
        cfg.greeting.paragraphs.forEach(function (para) {
            var p = document.createElement("p");
            p.className = "dear-message__para";
            p.textContent = para;
            greetingEl.appendChild(p);
        });
    }

    var heroRoot = document.getElementById("dearHeroSlides");
    if (heroRoot && cfg.heroImages && cfg.heroImages.length) {
        heroRoot.innerHTML = "";
        cfg.heroImages.forEach(function (src, i) {
            var slide = document.createElement("div");
            slide.className = "dear-hero__slide";
            slide.setAttribute("data-index", String(i));
            var img = document.createElement("img");
            img.className = "dear-hero__img";
            img.src = src;
            img.alt = "";
            img.width = 1600;
            img.height = 2400;
            img.decoding = "async";
            if (i === 0) {
                img.setAttribute("fetchpriority", "high");
            }
            slide.appendChild(img);
            heroRoot.appendChild(slide);
        });
        var fallback = document.createElement("div");
        fallback.className = "dear-hero__slide dear-hero__slide--fallback";
        fallback.setAttribute("aria-hidden", "true");
        heroRoot.appendChild(fallback);
    }

    function profileCard(role, data) {
        return (
            '<article class="dear-profile-card reveal">' +
            '<div class="dear-profile-card__photo" data-parallax>' +
            '<img class="dear-img" src="' +
            data.image +
            '" alt="' +
            data.name +
            '" width="480" height="600" loading="lazy" decoding="async"/>' +
            "</div>" +
            '<div class="dear-profile-card__body">' +
            '<p class="dear-profile-card__role">' +
            role +
            "</p>" +
            '<p class="dear-profile-card__name-en">' +
            data.nameEn +
            "</p>" +
            '<h3 class="dear-profile-card__name">' +
            data.name +
            "</h3>" +
            '<p class="dear-profile-card__desc">' +
            data.description +
            "</p>" +
            "</div></article>"
        );
    }

    var profileGrid = document.getElementById("profileGrid");
    if (profileGrid && cfg.profile) {
        profileGrid.innerHTML =
            profileCard(cfg.profile.groom.role, cfg.profile.groom) +
            profileCard(cfg.profile.bride.role, cfg.profile.bride);
    }

    var storyList = document.getElementById("storyList");
    if (storyList && cfg.storyImages) {
        storyList.innerHTML = "";
        cfg.storyImages.forEach(function (src, i) {
            var fig = document.createElement("figure");
            fig.className = "dear-story__item reveal";
            fig.style.setProperty("--reveal-delay", i * 0.12 + "s");
            fig.innerHTML =
                '<div class="dear-story__frame"><img class="dear-img" src="' +
                src +
                '" alt="" width="900" height="1200" loading="lazy" decoding="async"/></div>';
            storyList.appendChild(fig);
        });
        if (!cfg.storyImages.length) {
            storyList.innerHTML =
                '<figure class="dear-story__item reveal"><div class="dear-story__frame dear-story__frame--placeholder"></div></figure>';
        }
    }
})();
