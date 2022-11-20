<%@ tag pageEncoding="UTF-8"
    display-name="list-pagination"
    body-content="empty"
    trimDirectiveWhitespaces="true"
    description="Generates a pagination based on search results."%>


<%@ attribute name="search" type="org.opencms.jsp.search.result.I_CmsSearchResultWrapper" required="true"
    description="Contains the search result data that was generated by the search tag."%>

<%@ attribute name="onclickAction" type="java.lang.String" required="true"
    description="The on click action string that reloads the list. It has to contain a $(LINK) macro that
    is replaced with the actual link calculated for the individual pages.
    This is a workaround to use the pagination tag for the list as well as the search result. "%>

<%@ attribute name="singleStep" type="java.lang.Boolean" required="false"
    description="Selects if single step next / previous arrows are shown."%>


<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="mercury" tagdir="/WEB-INF/tags/mercury" %>

<c:if test="${search.numFound > 0}">
<fmt:setLocale value="${cms.locale}" />
<cms:bundle basename="alkacon.mercury.template.messages">

    <c:set var="pagination" value="${search.controller.pagination}" />
    <%-- show pagination if it should be given and if it's really necessary --%>
    <c:if test="${not empty pagination && search.numPages > 1}">

        <c:set var="addButtons" value="${singleStep ? 0 : 2}" />
        <c:set var="maxPages" value="${pagination.config.pageNavLength}" />
        <c:set var="lastPage" value="${search.numPages}" />
        <c:set var="currentPage" value="${pagination.state.currentPage}" />
        <c:set var="previousPage" value="${currentPage > 1 ? currentPage-1 : 1}"/>
        <c:set var="nextPage" value="${currentPage < lastPage ? currentPage + 1 : lastPage}" />
        <c:set var="firstShownPage" value="${search.pageNavFirst}" />
        <c:set var="lastShownPage" value="${search.pageNavLast}" />
        <c:set var="allPages" value="${false and ((maxPages + addButtons) >= lastPage)}" />

        <c:set var="stateParameterPageMap" value="${search.stateParameters.setPage}" />
        <mercury:nl />
        <div class="list-append-position" data-dynamic="false" ><%----%>

            <%-- PRE: current:${currentPage} last:${lastPage} next:${nextPage} firstShow:${firstShownPage} lastShow:${lastShownPage} all:${allPages} max:${maxPages} --%>
            <c:choose>
                <c:when test="${allPages}">
                    <%-- Begin / end buttons are not required, use all space for numbered buttons --%>
                    <c:set var="maxPages" value="${maxPages + addButtons}" />
                    <c:set var="firstShownPage" value="1" />
                    <c:set var="lastShownPage" value="${lastPage}" />
                </c:when>
                <c:when test="${singleStep}">
                    <c:if test="${(lastPage - maxPages > 0) && (firstShownPage > (lastPage - maxPages))}">
                        <c:set var="firstShownPage" value="${lastPage + 1 - maxPages}" />
                    </c:if>
                    <c:if test="${lastShownPage < maxPages}">
                        <c:set var="lastShownPage" value="${lastPage < maxPages ? lastPage : maxPages}" />
                    </c:if>
                    <c:set var="showGoFirst" value="${true}" />
                    <c:set var="showGoNext" value="${true}" />
                </c:when>
                <c:otherwise>
                    <c:if test="${(lastPage - maxPages > 0) && (firstShownPage > (lastPage - maxPages))}">
                        <c:set var="firstShownPage" value="${lastPage - maxPages}" />
                    </c:if>
                    <c:set var="showGoFirst" value="${firstShownPage != 1}" />
                    <c:if test="${not showGoFirst}">
                        <c:set var="maxPages" value="${maxPages + 1}" />
                    </c:if>
                    <c:if test="${lastShownPage < maxPages}">
                        <c:set var="lastShownPage" value="${lastPage < maxPages ? lastPage : maxPages}" />
                    </c:if>
                    <c:set var="showGoNext" value="${lastShownPage < lastPage}" />
                </c:otherwise>
            </c:choose>
            <%-- POST: current:${currentPage} last:${lastPage} firstShow:${firstShownPage} lastShow:${lastShownPage} all:${allPages} max:${maxPages} --%>

            <ul class="pagination"><%----%>
                <mercury:nl />
                <c:if test="${showGoFirst}">
                    <c:if test="${singleStep}">
                        <c:set var="pageNr">${previousPage}</c:set>
                        <%-- Placement of nl required to prevent visible whitespace between the li tags --%>
                        <li <mercury:nl />class="previous${currentPage > 1 ? '' : ' disabled'}"><%----%>
                            <a href="${empty onclickAction ? cms.requestContext.uri.concat('?').concat(stateParameterPageMap[pageNr]) : 'javascript:void(0)'}"${' '}<%--
                            --%>${currentPage > 1 ? "" : "tabindex='-1'"}${' '}<%--
                            --%>onclick='${fn:replace(onclickAction, "$(LINK)", stateParameterPageMap[pageNr])}'${' '}<%--
                            --%>title='<fmt:message key="msg.page.list.pagination.previous.title"/>'><%--
                                --%><span class="sr-only"><fmt:message key="msg.page.list.pagination.previous.title" /></span><%----%>
                                    <mercury:icon icon="angle-left" tag="span" use="pagination" />
                            </a><%----%>
                        </li><%----%>
                    </c:if>
                    <c:if test="${firstShownPage > 1}">
                        <c:set var="pageNr">1</c:set>
                        <li <mercury:nl />class="first ${firstShownPage > 2 ? ' gap' : ''}"><%----%>
                            <a href="${empty onclickAction ? cms.requestContext.uri.concat('?').concat(stateParameterPageMap[pageNr]) : 'javascript:void(0)'}"${' '}<%--
                            --%>${currentPage > 1 ? "" : "tabindex='-1'"}${' '}<%--
                            --%>onclick='${fn:replace(onclickAction, "$(LINK)", stateParameterPageMap[pageNr])}'${' '}<%--
                            --%>title='<fmt:message key="msg.page.list.pagination.first.title"/>'><%--
                                --%><span class="sr-only"><fmt:message key="msg.page.list.pagination.first.title" /></span><%----%>
                                    <span class="number" aria-hidden="true">1</span><%----%>
                            </a><%----%>
                        </li><%----%>
                    </c:if>
                </c:if>

                <c:forEach var="page" begin="${firstShownPage}" end="${lastShownPage}">
                    <c:set var="pageNr">${page}</c:set>
                    <li <mercury:nl />class="${pageNr eq lastShownPage ? 'lastpage' : 'page'}${currentPage eq page ? ' active' : ''}"><%----%>
                        <a href="${empty onclickAction ? cms.requestContext.uri.concat('?').concat(stateParameterPageMap[pageNr]) : 'javascript:void(0)'}"${' '}<%--
                        --%>onclick='${fn:replace(onclickAction, "$(LINK)", stateParameterPageMap[pageNr])}'${' '}<%--
                        --%>title='<c:choose>
                                <c:when test="${currentPage eq page}">
                                    <fmt:message key="msg.page.list.pagination.page.current"><fmt:param>${pageNr}</fmt:param></fmt:message>
                                </c:when>
                                <c:otherwise>
                                    <fmt:message key="msg.page.list.pagination.page.title"><fmt:param>${pageNr}</fmt:param></fmt:message>
                                </c:otherwise>
                            </c:choose>'><%--
                            --%><span class="number" aria-hidden="true">${pageNr}</span><%----%>
                        </a><%----%>
                    </li><%----%>
                </c:forEach>

                <c:if test="${showGoNext}">
                    <c:if test="${singleStep}">
                        <c:set var="pageNr">${nextPage}</c:set>
                        <li <mercury:nl />class="next${currentPage >= lastPage ? ' disabled' : ''}"><%----%>
                            <a href="${empty onclickAction ? cms.requestContext.uri.concat('?').concat(stateParameterPageMap[pageNr]) : 'javascript:void(0)'}"${' '}<%--
                            --%>${currentPage >= lastPage ? "tabindex='-1'" : ""}${' '}<%--
                            --%>onclick='${fn:replace(onclickAction, "$(LINK)", stateParameterPageMap[pageNr])}'${' '}<%--
                            --%>title='<fmt:message key="msg.page.list.pagination.next.title"/>'><%--
                                --%><span class="sr-only"><fmt:message key="msg.page.list.pagination.next.title" /></span><%----%>
                                    <mercury:icon icon="angle-right" tag="span" use="pagination" />
                            </a><%----%>
                        </li><%----%>
                    </c:if>
                </c:if>
            </ul><%----%>
        </div><%----%>
        <mercury:nl />
    </c:if>

</cms:bundle>
</c:if>
