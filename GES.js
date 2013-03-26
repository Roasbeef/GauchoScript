// Generated by CoffeeScript 1.6.2
(function() {
  $(function() {
    var GES;

    GES = {
      autoLogin: function() {
        var $autofill, $error_msg, auto_msg;

        $autofill = $('input:-webkit-autofill');
        if (autofill.length) {
          auto_msg = 'Auto-Logging In';
          $error_msg = $('span[class="error"]').first();
          if ($error_msg.text().search("Please login again.")) {
            $("form:first[method='post']").submit();
            return $('.subcontent.loginsub').after($("<div class='subcontent autologinsub'><h1>" + auto_msg + "</h1></div>"));
          }
        }
      },
      directLinkify: function() {
        var $current_week, $faux_week, $go_to_context, $left_col, $right_col, $separator, link, new_url, _i, _len, _ref;

        _ref = $('.activity.resource > a');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          link.removeAttribute('onclick');
          new_url = link.href.concat('&inpopup=true');
          link.attr('href', new_url);
        }
        $separator = $('.section.separator').first().clone();
        $current_week = $('.current').first();
        $faux_week = $current_week.clone();
        $faux_week.addClass('fauxWeek').attr('id', 'faux-section');
        $('.weeks tbody').prepend($faux_week);
        $faux_week.after($separator);
        $go_to_context = $('<h3 class="goto-context">Go To Context</h3>');
        $go_to_context.on('click', function() {
          var $real_current_week, $window, el_height, el_offset, el_width, view_port_height, view_port_width;

          $window = $(window);
          view_port_width = $window.width();
          view_port_height = $window.height();
          $real_current_week = $('.realCurrentWeek').first();
          el_width = $realCurrentWeek.width();
          el_height = $realCurrentWeek.height();
          el_offset = $realCurrentWeek.offset();
          return $window.scrollTop(el_offset.top + (el_height / 2) - (view_port_height / 2)).scrollLeftTop(el_offset.left + (el_width / 2) - (view_port_width / 2));
        });
        $('.fauxWeek .weekdates').before($go_to_context);
        $left_col = $('#left-column > div');
        $right_col = $('#right-column > div');
        return $left_col.scrollToFixed({
          limit: $('#footer').offset().top - left_column.outerHeight()
        });
      },
      addQuickList: function() {
        var $left_col, $quick_list, link, new_link, new_link_item, short_name, _i, _len, _ref;

        $left_col = $('#left-column');
        $quick_list = $('<ul>', {
          "class": 'list'
        });
        _ref = '.name > a';
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          short_name = link.text.split(' (')[0];
          new_link = $(link).clone();
          new_link.text(short_name);
          new_link_item = new_link.wrap('<li>').parent();
          $quick_list.append(new_link_item);
        }
        $quick_list = quick_list.wrap($('<div>', {
          'class': 'content'
        })).parent();
        $quick_list = quick_list.wrap($('<div>', {
          'class': 'sideblock'
        })).parent();
        $quick_list.prepend($('<div>', {
          'class': 'header',
          'text': 'QuickClick Menu'
        }));
        $quick_list = quick_list.wrap($('<div>', {
          "class": "quickclick"
        })).parent();
        $quick_list = quick_list.wrap($('<div>')).parent();
        $quick_list.prependTo($left_col);
        return localStorage["quicklist"] = escape($quick_list.html());
      },
      addCachedQuickList: function() {
        var $quick_list;

        $quick_list = $(unescape(localStorage["quicklist"]));
        $quick_list.find('.header').wrapInner($('<h3>'));
        $(quick_list_elem).append('<p>If this menu is out of date, <a href="https://gauchospace.ucsb.edu/courses/">visit the <span class="mycoursebutton">My Courses</span> page while logged in to refresh</a>.</p>');
        $(quick_list_elem).append("<p>This is cached from the last logged in user. If auto-login works for you, clicking will auto-log you in through these links if you were logged out from inactivity.</p>");
        $(quick_list_elem).append("<p>If you have an issue with this extension, please make an account on <a href='http://github.com'>Github</a> and submit an issue <a href='https://github.com/crazysim/gauchospace-lasso/issues'>here</a>.");
        return $("#left > a").after(quick_list_elem);
      }
    };
    switch (window.location.pathname) {
      case "/courses/login/":
        GES.autoLogin();
        break;
      case "/courses/course/view.php":
        GES.directLinkify();
        break;
      case "/courses/":
        GES.addQuickList();
        break;
      case "/":
        GES.addCachedQuickList();
    }
    return $('#menubar').prepend('<li><a href="//gauchospace.ucsb.edu">Front');
  })(window, document, jQuery);

}).call(this);

/*
//@ sourceMappingURL=GES.map
*/
