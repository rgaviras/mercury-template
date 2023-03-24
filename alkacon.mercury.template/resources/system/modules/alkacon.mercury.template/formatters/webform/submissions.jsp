<%@page pageEncoding="UTF-8"
    buffer="none"
    session="false"
    trimDirectiveWhitespaces="true"
    import="alkacon.mercury.webform.*" %>


<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="mercury" tagdir="/WEB-INF/tags/mercury" %>


<cms:formatter var="content">
    <c:set var="rawContent" value="${content.rawContent}" />
    <c:set var="bean" value='<%=new alkacon.mercury.webform.CmsFormDataBean((org.opencms.xml.I_CmsXmlDocument) pageContext.getAttribute("rawContent")) %>' />

    <fmt:setLocale value="${cms.locale}"/>
    <cms:bundle basename="alkacon.mercury.template.messages">

    <div class="accordion"><%----%>
        <div class="acco-header"><%----%>
            <c:set var="parentId" value="${cms.element.settings.id}" />
            <c:set var="itemId" value="${parentId}_${cms.element.settings.index}" />
            <a class="acco-toggle collapsed" data-bs-toggle="collapse" data-bs-parent="#${parentId}" href="#${itemId}"><%----%>
                <div><%----%>
                    <c:choose>
                        <c:when test="${empty bean.titleProperty}">
                            <fmt:message key="msg.page.form.submission.title.default.1">
                                <fmt:param>
                                    <fmt:formatDate value="${cms:convertDate(content.file.dateCreated)}" type="both" dateStyle="short" timeStyle="short" />
                                </fmt:param>
                            </fmt:message>
                        </c:when>
                        <c:otherwise>${bean.titleProperty}</c:otherwise>
                    </c:choose>
                </div><%----%>
                <c:if test="${bean.changed}">
                    <div class="book-info"><%----%>
                        <span class="oct-meta-info severe"><fmt:message key="msg.page.form.status.submission.changed" /></span><%----%>
                    </div><%----%>
                </c:if>
            </a><%----%>
        </div><%----%>
        <mercury:nl />

        <div id="${itemId}" class="acco-body collapse" data-bs-parent="#${parentId}"><%----%>
            <div class="submission-actions subelement"><%----%>
                <c:if test="${not submissionsDialogDeclared}">
                <mercury:nl />
                <script><%--
                --%>class SubmissionsDialog {<%--
                    --%>constructor(action, itemId, uuid) {<%--
                        --%>const button = document.getElementById(action + "_button_" + itemId);<%--
                        --%>const dialog = document.getElementById(action + "_dialog_" + itemId);<%--
                        --%>const params = new URLSearchParams(location.search);<%--
                        --%>const formmanage = params.get("formmanage");<%--
                        --%>button.addEventListener("click", () =>  { dialog.showModal(); });<%--
                        --%>dialog.addEventListener("close", () => {<%--
                            --%>if (dialog.returnValue == "confirm") {<%--
                                --%>location.href = "?formmanage=" + formmanage + "&action=" + action + "&uuid=" + uuid;<%--
                            --%>}<%--
                        --%>});<%--
                    --%>}<%--
                --%>}<%--
            --%></script><%----%>
                </c:if>
                <c:set var="submissionsDialogDeclared" value="${true}" scope="request" />
                <c:if test="${not bean.cancelled}">
                    <button id="cancel_button_${itemId}" class="btn oct-meta-info btn-sm"><%----%>
                        <fmt:message key="msg.page.form.submission.action.cancel" />
                    </button><%----%>
                    <dialog id="cancel_dialog_${itemId}"><%----%>
                        <form method="dialog"><%----%>
                            <h3><fmt:message key="msg.page.form.bookingstatus.dialog.confirm.label" /></h3><%----%>
                            <div><fmt:message key="msg.page.form.submission.ask.cancel"><fmt:param>${bean.titleProperty}</fmt:param></fmt:message></div><%----%>
                            <div class="buttons"><%----%>
                                <button value="cancel" class="btn"><%----%>
                                    <fmt:message key="msg.page.form.submission.dialog.cancel" />
                                </button><%----%>
                                <button value="confirm" class="btn"><%----%>
                                    <fmt:message key="msg.page.form.submission.confirm.cancel" />
                                </button><%----%>
                            </div><%----%>
                        </form><%----%>
                    </dialog><%----%>
                    <script>new SubmissionsDialog("cancel", "${itemId}", "${content.id}")</script><%----%>
                </c:if>
                <c:if test="${not bean.cancelled and bean.waitlist and param.hasFreeParticipantPlaces eq 'true'}">
                    <button id="add_button_${itemId}" class="btn oct-meta-info btn-sm"><%----%>
                        <fmt:message key="msg.page.form.submission.action.add" />
                    </button><%----%>
                    <dialog id="add_dialog_${itemId}"><%----%>
                        <form method="dialog"><%----%>
                            <h3><fmt:message key="msg.page.form.bookingstatus.dialog.confirm.label" /></h3>
                            <div><fmt:message key="msg.page.form.submission.ask.add"><fmt:param>${bean.titleProperty}</fmt:param></fmt:message></div><%----%>
                            <div class="buttons"><%----%>
                                <button value="cancel" class="btn"><%----%>
                                    <fmt:message key="msg.page.form.submission.dialog.cancel" />
                                </button><%----%>
                                <button value="confirm" class="btn"><%----%>
                                    <fmt:message key="msg.page.form.submission.confirm.add" />
                                </button><%----%>
                            </div><%----%>
                        </form><%----%>
                    </dialog><%----%>
                    <script>new SubmissionsDialog("add", "${itemId}", "${content.id}")</script><%----%>
                </c:if>
            </div><%----%>
            <table class="submissions"><%----%>
                <c:forEach var="data" items="${bean.data}">
                    <tr><%----%>
                        <td>${data.key}:</td><%----%>
                        <td>${data.value}</td><%----%>
                    </tr><%----%>
                </c:forEach>
                <tr class="emphasize"><%----%>
                    <td><fmt:message key="msg.page.form.submission.date" /></td><%----%>
                    <td><fmt:formatDate type="both" dateStyle="short" timeStyle="short" value="${cms:convertDate(content.file.dateCreated)}" /></td><%----%>
                </tr><%----%>
                <c:if test="${bean.waitlistMovedUp}">
                    <tr class="emphasize"><%----%>
                        <td><fmt:message key="msg.page.form.bookingstatus.moveupdate.label" />:</td><%----%>
                        <td><fmt:formatDate type="both" dateStyle="short" timeStyle="short" value="${cms:convertDate(bean.dateMovedUp)}" /></td><%----%>
                    </tr><%----%>
                </c:if>
                <c:if test="${bean.cancelled}">
                    <tr class="emphasize"><%----%>
                        <td><fmt:message key="msg.page.form.bookingstatus.canceldate.label" />:</td><%----%>
                        <td><fmt:formatDate type="both" dateStyle="short" timeStyle="short" value="${cms:convertDate(bean.dateCancelled)}" /></td><%----%>
                    </tr><%----%>
                </c:if>
                <tr class="emphasize"><%----%>
                    <td><fmt:message key="msg.page.form.bookingstatus.mailsreceived" />:</td><%----%>
                    <td><%----%>
                        <c:if test="${bean.registrationMailSent}">
                            <div><fmt:message key="msg.page.form.bookingstatus.registrationmail" /></div><%----%>
                        </c:if>
                        <c:if test="${bean.waitlistNotificationSent}">
                            <div><fmt:message key="msg.page.form.bookingstatus.waitlistmail" /></div><%----%>
                        </c:if>
                        <c:if test="${bean.moveUpMailSent}">
                            <div><fmt:message key="msg.page.form.bookingstatus.moveupmail" /></div><%----%>
                        </c:if>
                        <c:if test="${bean.cancelMailSent}">
                            <div><fmt:message key="msg.page.form.bookingstatus.cancelmail" /></div><%----%>
                        </c:if>
                    </td><%----%>
                </tr><%----%>
            </table><%----%>
        </div><%----%>
        <mercury:nl />

    </div><%----%>
    <mercury:nl />

    </cms:bundle>

</cms:formatter>
