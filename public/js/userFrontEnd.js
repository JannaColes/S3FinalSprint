
function searchByKeywordUser() {
    const keyword = document.getElementById('search-by-keyword-input-user').value;
    console.log(keyword); 
    window.location.href = `/user/search?keyword=${encodeURIComponent(keyword)}`;
}




let userResort = this.document.querySelectorAll(".user-resortType"); 
let userResortImg = this.document.querySelectorAll(".user-resortImg"); 



userResort.forEach((resort, i) => {

    switch (resort.innerText) {
        case 'Pet-friendly Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 173, 191, 0.2)'; 
            userResortImg[i].src = '/images/PetFriendly.jpg'; 
            break;
        case 'Ski Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 173, 191, 0.2)'; 
            userResortImg[i].src = '/images/Ski.jpg'; 
            break;
        case 'Yoga Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 173, 191, 0.2)'; 
            userResortImg[i].src = '/images/Yoga.jpg'; 
            break;
        case 'Safari Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 173, 191, 0.2)'; 
            userResortImg[i].src = '/images/Safari.jpg'; 
            break;
        case 'Ranch':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 173, 191, 0.2)'; 
            userResortImg[i].src = '/images/Ranch.jpg'; 
            break;
        case 'Golf Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 191, 191, 0.2)'; 
            userResortImg[i].src = '/images/Golf.jpg'; 
            break;
        case 'Casino Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 191, 191, 0.2)'; 
            userResortImg[i].src = '/images/Casino.jpg'; 
                break;
        case 'Desert Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 191, 191, 0.2)'; 
            userResortImg[i].src = '/images/Desert.jpg'; 
            break;
        case 'Ecological Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 191, 191, 0.2)'; 
            userResortImg[i].src = '/images/Ecological.jpg'; 
                break;
        case 'Lake Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(4, 191, 191, 0.2)'; 
            userResortImg[i].src = '/images/Lakeside.jpg'; 
            break;
        case 'Beach Resort':
        resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
        userResortImg[i].src = '/images/Beach.jpg'; 
            break;
        case 'Mountain Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/Mountain.jpg'; 
            break;
        case 'Themed Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/Themed.jpg'; 
                break;
        case 'Vineyard Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/Vineyard.jpg'; 
                break;
        case 'Couples Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/Couples.jpg'; 
            break;
        case 'Family Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/Family.jpg'; 
                break;
        case 'Island Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/Island.jpg'; 
                break;
        case 'All-Inclusive Resort':
            resort.parentElement.parentElement.style.backgroundColor = 'rgba(126, 166, 41, 0.2)'; 
            userResortImg[i].src = '/images/AllInclusive.jpg'; 
                break;
        default:
            break;

    }
}); 






