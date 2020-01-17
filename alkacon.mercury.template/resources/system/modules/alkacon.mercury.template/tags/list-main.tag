<%@ tag pageEncoding="UTF-8"
    display-name="list-main"
    body-content="empty"
    trimDirectiveWhitespaces="true"
    description="Searches for resources and displays the results." %>

<%@ attribute name="instanceId" type="java.lang.String" required="true"
    description="The id of the list element instance (generated from the UID for the container).
    This will always be unique even if the same list is on a page more then once." %>

<%@ attribute name="elementId" type="java.lang.String" required="false"
    description="The id of the list content element (generated from the UID of the list resource).
    If the same list is on a page more then once, then all list instances share this id." %>

<%@ attribute name="config" type="org.opencms.jsp.util.CmsJspContentAccessBean" required="true"
    description="The list configuration." %>

<%@ attribute name="count" type="java.lang.String" required="true"
    description="The amount of elements per page, if different for multiple pages, pass the page sizes hyphen separated for each page.
     The last size will be the page size for all remaining pages. E.g., use '5-8' to get the first page with five elements, all others with 8." %>

<%@ attribute name="settings" type="java.util.Map" required="true"
    description="A map that can hold a variety of settings that are used to configure the appearance of the list. Is usally read from the list elements content." %>

<%@ attribute name="locale" type="java.lang.String" required="true"
    description="The locale to be used." %>

<%@ attribute name="pageUri" type="java.lang.String" required="false"
    description="The URI of the page where the list is used. Is needed for AJAX requests to setup the search context." %>

<%@ attribute name="subsite" type="java.lang.String" required="false"
    description="The subsite the current request comes from. Is needed for AJAX requests to setup the search context." %>

<%@ attribute name="ajaxCall" type="java.lang.Boolean" required="false"
    description="Indicates if this tag is used from an AJAX request." %>

<%@ attribute name="noscriptCall" type="java.lang.Boolean" required="false"
    description="Indicates if this tag is used from inside a NOSCRIPT html tag." %>


<%@ variable name-given="search" scope="AT_END" declare="true" variable-class="org.opencms.jsp.search.result.I_CmsSearchResultWrapper"
    description="The search result given from the search tag." %>

<%@ variable name-given="searchConfig" scope="AT_END" declare="true" variable-class="java.lang.String"
    description="The search configuration string that was used by the search tag." %>


<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="mercury" tagdir="/WEB-INF/tags/mercury" %>


<%-- ####### Perform the search ################ --%>
<mercury:list-search
    config="${config}"
    subsite="${subsite}"
    count="${count}"
/>

<c:if test="${search.numFound > 0}">

    <%-- ####### The sort option bar ######## --%>
    <mercury:list-sort-option-bar
        elementId="${elementId}"
        searchresult="${search}"
        settings="${settings}"
    />

    <c:set var="listEntryWrapper">
        <c:if test="${settings.listEntryWrapper != 'none'}"><%--
        --%>list-entry<%--
        --%><c:if test="${not empty settings.listEntryWrapper}">
                ${' '}${settings.listEntryWrapper}
            </c:if>
        </c:if>
    </c:set>

    <cms:addparams>
    <cms:param name="cssgrid" value="${listEntryWrapper}" />

    <c:set var="types" value="${config.valueList.TypesToCollect}" />
    <c:set var="instancedatefield">instancedate_${locale}_dt</c:set>
    <c:set var="listEntryTag" value="${not empty settings.listEntryTag ? settings.listEntryTag : 'li' }" />

    <c:set var="currentResult" value="${search.start - 1}" />

    <c:set var="categories">${config.value.Category}</c:set>

    <c:if test="${not ajaxCall}">
        <cms:jsonobject var="listGeneratedJson" mode="wrapper" scope="request" />
    </c:if>

    <%--####### Elements of the list ######## --%>
    <c:forEach var="result" items="${search.searchResults}" varStatus="status">

        <c:if test="${not empty listEntryWrapper}"><${listEntryTag} class="${listEntryWrapper}"></c:if>

        <cms:display
            value="${result.fields['id']}"
            displayFormatters="${types}"
            editable="true"
            creationSiteMap="${pageUri}"
            create="true"
            delete="true"
            postCreateHandler="org.opencms.file.collectors.CmsAddCategoriesPostCreateHandler|${categories}"
            >

            <c:forEach var="parameter" items="${settings}">
                 <cms:param name="${parameter.key}" value="${parameter.value}" />
            </c:forEach>

            <cms:param name="resultInList" value="${currentResult + status.count}" />
            <cms:param name="resultOnPage" value="${status.count}" />
            <cms:param name="resultPage" value="${search.controller.pagination.state.currentPage}" />
            <cms:param name="resultPageSize" value="${search.controller.pagination.currentPageSize}" />
            <cms:param name="resultTotal" value="${search.numFound}" />
            <cms:param name="listid">${instanceId}</cms:param>
            <cms:param name="index">${status.index}</cms:param>
            <cms:param name="last">${status.last}</cms:param>
            <cms:param name="pageUri">${pageUri}</cms:param>
            <cms:param name="instancedate">${result.dateFields[instancedatefield].time}</cms:param>
            <cms:param name="nglist">true</cms:param>
            <cms:param name="noscriptList">${noscriptCall}</cms:param>
            <cms:param name="ajaxList">${ajaxCall}</cms:param>
        </cms:display>

        <c:if test="${not empty listEntryWrapper}"></${listEntryTag}></c:if>

    </c:forEach>

    <c:if test="${not empty listGeneratedJson}">
        <cms:jsonvalue key="listid" value="${instanceId}" target="${listGeneratedJson}" />
        <cms:jsonvalue key="resultTotal" value="${search.numFound}" target="${listGeneratedJson}" />
        <mercury:nl />
        <script type="application/ld+json">${cms.isOnlineProject ? listGeneratedJson.compact : listGeneratedJson.pretty}</script><%----%>
        <mercury:nl />
    </c:if>

    </cms:addparams>

</c:if>
