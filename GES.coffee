$(()->
  GES =
    autoLogin: () ->
      $auto_fill = $('input:-webkit-autofill')
      if $auto_fill.length
        auto_msg = 'Auto-Logging In'
        $error_msg = $('span[class="error"]').first()
        if $error_msg.text().search("Please login again.")
          $("form:first[method='post']").submit()
          $('.subcontent.loginsub').after(
            $("<div class='subcontent autologinsub'><h1>#{auto_msg}</h1></div>"))

    directLinkify: () ->
      for link in $('.activity.resource > a')
        # disable click event
        link.removeAttribute('onclick')
        # direct link to the page
        new_url = link.href.concat('&inpopup=true')
        $(link).attr('href', new_url)

      # Add faux current week
      $separator = $('.section.separator').first().clone()
      $current_week = $('.current').first()
      $faux_week = $current_week.clone()

      $faux_week.addClass('fauxWeek').attr('id', 'faux-section')
      $('.weeks tbody').prepend $faux_week
      $faux_week.after $separator

      # Jump to Context
      $go_to_context = $('<h3 class="goto-context">Go To Context</h3>')
      $go_to_context.on 'click', () ->
        $window = $(window)
        view_port_width = $window.width()
        view_port_height = $window.height()
        $real_current_week = $('.realCurrentWeek').first()
        el_width = $realCurrentWeek.width()
        el_height = $realCurrentWeek.height()
        el_offset = $realCurrentWeek.offset()

        $window.scrollTop(el_offset.top + (el_height/2) - (view_port_height/2))
               .scrollLeftTop(el_offset.left + (el_width/2) - (view_port_width/2))

      $('.fauxWeek .weekdates').before $go_to_context

      $left_col = $('#left-column > div')
      $right_col = $('#right-column > div')

      $left_col.scrollToFixed limit: $('#footer').offset().top - $left_col.outerHeight()

    addQuickList: () ->
      $left_col = $('#left-column')
      $quick_list = $('<ul>', class: 'list')

      for link in $('.name > a')
        short_name = link.text.split(' (')[0]
        $new_link = $(link).clone()

        $new_link.text(short_name)
        $new_link_item = $new_link.wrap('<li>').parent()
        $quick_list.append $new_link_item

      $quick_list = $quick_list.wrap($('<div>', {'class':'content'})).parent()
      $quick_list = $quick_list.wrap($('<div>', {'class':'sideblock'})).parent()
      $quick_list.prepend($('<div>', {'class': 'header', 'text': 'QuickClick Menu'}))
      $quick_list = $quick_list.wrap($('<div>', {"class":"quickclick"})).parent()
      $quick_list = $quick_list.wrap($('<div>')).parent()
      $quick_list.prependTo($left_col)

      localStorage["quicklist"] = escape $quick_list.html()

    addCachedQuickList: ()  ->
      $quick_list = $(unescape localStorage["quicklist"])

      $quick_list.find('.header').wrapInner $('<h3>')
      $(quick_list_elem).append('<p>If this menu is out of date, <a href="https://gauchospace.ucsb.edu/courses/">visit the <span class="mycoursebutton">My Courses</span> page while logged in to refresh</a>.</p>')
      $(quick_list_elem).append("<p>This is cached from the last logged in user. If auto-login works for you, clicking will auto-log you in through these links if you were logged out from inactivity.</p>")
      $(quick_list_elem).append("<p>If you have an issue with this extension, please make an account on <a href='http://github.com'>Github</a> and submit an issue <a href='https://github.com/crazysim/gauchospace-lasso/issues'>here</a>.")
      $("#left > a").after(quick_list_elem)


  switch window.location.pathname
    when "/courses/login/"
      #Auto relogin if timed out.
      GES.autoLogin()
    when "/courses/course/view.php"
      # directLinkify all doc URLS
      # Prepend a clone of current week to top
      # Position-fixed the sidebars
      GES.directLinkify()
    when "/courses/"
      GES.addQuickList()
    when "/"
      GES.addCachedQuickList()

  $('#menubar').prepend('<li><a href="//gauchospace.ucsb.edu">Front')

)(window, document, jQuery)
