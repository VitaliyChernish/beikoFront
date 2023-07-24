export const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.getElementById('contentForScrollingAnimation').style.opacity = 1;
        document.getElementById('contentForScrollingAnimation').style.scale = '1.5';
        if (window.innerWidth < 1199) {
          document.getElementById('contentForScrollingAnimation').style.scale = '1'
        }
        document.getElementById('contentForScrollingAnimation2').style.opacity = 1;
        document.getElementById('contentForScrollingAnimation2').style.left = '0';

        document.getElementById('contentForScrollingAnimation3').style.opacity = 1;
        document.getElementById('contentForScrollingAnimation3').style.left = '0';
      }
    });
  };