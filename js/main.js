  function openDocModal(key){
    var el = document.getElementById('doc-modal-' + key);
    if(el){
      el.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }
  function closeDocModal(key){
    var el = document.getElementById('doc-modal-' + key);
    if(el){
      el.hidden = true;
      document.body.style.overflow = '';
    }
  }
  function openProjectModal(card){
    if(card.closest('.project-modal-content')) return;
    card._originParent = card.parentNode;
    card._originNext = card.nextSibling;
    var content = document.getElementById('project-modal-content');
    content.appendChild(card);
    card.classList.add('in-modal');
    document.getElementById('project-modal-overlay').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeProjectModal(){
    var content = document.getElementById('project-modal-content');
    var card = content.firstElementChild;
    if(card && card._originParent){
      card.classList.remove('in-modal');
      card._originParent.insertBefore(card, card._originNext);
    }
    document.getElementById('project-modal-overlay').hidden = true;
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.project-card').forEach(function(card){
    card.addEventListener('click', function(e){
      if(e.target.closest('a, video')) return;
      openProjectModal(card);
    });
  });

  document.querySelectorAll('.doc-modal-overlay, .project-modal-overlay').forEach(function(overlay){
    overlay.addEventListener('click', function(e){
      if(e.target === overlay){
        if(overlay.id === 'project-modal-overlay'){
          closeProjectModal();
        } else {
          overlay.hidden = true;
          document.body.style.overflow = '';
        }
      }
    });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('.doc-modal-overlay').forEach(function(overlay){
        overlay.hidden = true;
      });
      if(!document.getElementById('project-modal-overlay').hidden){
        closeProjectModal();
      }
      document.body.style.overflow = '';
    }
  });
